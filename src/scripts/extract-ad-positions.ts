#!/usr/bin/env tsx

/**
 * Extract Ad Positions Script
 * 
 * Scans React templates for data-ad-position attributes and generates
 * a canonical list of ad positions to seed the Ads Manager.
 * 
 * Usage:
 *   npm run extract-ad-positions
 *   or
 *   tsx scripts/extract-ad-positions.ts
 */

import fs from "fs";
import path from "path";

interface AdPosition {
  id: string;
  name: string;
  description: string;
  pageType: string;
  template: string;
  lineNumber?: number;
}

const TEMPLATES_DIR = path.join(process.cwd(), "templates");
const OUTPUT_FILE = path.join(process.cwd(), "app", "dashboard", "ads", "data.json");

// Map template files to page types
const TEMPLATE_MAP: Record<string, string> = {
  "HomeTemplate.tsx": "homepage",
  "ArticleTemplate.tsx": "article",
  "CategoryTemplate.tsx": "category",
  "StaticTemplate.tsx": "website",
};

// Static pages to scan (in app directory)
const STATIC_PAGES = [
  { file: "app/terms/page.tsx", pageType: "website" },
  { file: "app/privacy/page.tsx", pageType: "website" },
  { file: "app/dmca/page.tsx", pageType: "website" },
  { file: "app/advertise/page.tsx", pageType: "website" },
];

// Position name mappings for better readability
const POSITION_NAMES: Record<string, string> = {
  "top-leaderboard": "Top Leaderboard Ad (ATF)",
  "mid-leaderboard": "Mid Leaderboard Ad",
  "bottom-leaderboard": "Bottom Leaderboard Ad",
  "sticky-footer": "Sticky Footer Ad",
  "in-feed-1": "In-Feed Native 1",
  "in-feed-2": "In-Feed Native 2",
  "in-feed-x": "In-Feed Native X (Repeating)",
  "atf-rectangle": "ATF Rectangle Ad (Highest Value)",
  "in-content-1": "In-Content 1",
  "in-content-2": "In-Content 2",
  "sidebar-sticky": "Sidebar Sticky (Desktop Only)",
  "sidebar-rectangle": "Sidebar Rectangle",
};

function extractPositionsFromFile(filePath: string, pageType: string): AdPosition[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const positions: AdPosition[] = [];

  // Match AdSlot components with position prop (handles multi-line)
  // Matches: <AdSlot ... position="position-name" ... />
  const adSlotRegex = /<AdSlot[^>]*position=["']([^"']+)["'][^>]*\/?>/g;

  let match;
  while ((match = adSlotRegex.exec(content)) !== null) {
    const positionId = match[1];
    
    // Find line number by counting newlines before the match
    const beforeMatch = content.substring(0, match.index);
    const lineNumber = (beforeMatch.match(/\n/g) || []).length + 1;

    const positionName = POSITION_NAMES[positionId] || positionId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    positions.push({
      id: positionId,
      name: positionName,
      description: `Ad position in ${pageType}`,
      pageType,
      template: path.basename(filePath),
      lineNumber,
    });
  }

  return positions;
}

function scanTemplates(): AdPosition[] {
  const allPositions: AdPosition[] = [];

  // Scan template files
  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.error(`❌ Templates directory not found: ${TEMPLATES_DIR}`);
  } else {
    const files = fs.readdirSync(TEMPLATES_DIR);

    for (const file of files) {
      if (!file.endsWith(".tsx")) continue;

      const pageType = TEMPLATE_MAP[file];
      if (!pageType) {
        console.log(`⚠️  Skipping ${file} (no page type mapping)`);
        continue;
      }

      const filePath = path.join(TEMPLATES_DIR, file);
      console.log(`📄 Scanning ${file}...`);

      const positions = extractPositionsFromFile(filePath, pageType);
      allPositions.push(...positions);

      console.log(`   Found ${positions.length} position(s)`);
    }
  }

  // Scan static pages
  console.log("\n📄 Scanning static pages...");
  for (const page of STATIC_PAGES) {
    const filePath = path.join(process.cwd(), page.file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${page.file} (not found)`);
      continue;
    }

    console.log(`📄 Scanning ${page.file}...`);
    const positions = extractPositionsFromFile(filePath, page.pageType);
    allPositions.push(...positions);
    console.log(`   Found ${positions.length} position(s)`);
  }

  return allPositions;
}

function groupPositionsByPageType(positions: AdPosition[]) {
  const grouped: Record<string, AdPosition[]> = {};

  for (const position of positions) {
    if (!grouped[position.pageType]) {
      grouped[position.pageType] = [];
    }

    // Avoid duplicates
    const exists = grouped[position.pageType].some((p) => p.id === position.id);
    if (!exists) {
      grouped[position.pageType].push(position);
    }
  }

  return grouped;
}

function generateOutput(grouped: Record<string, AdPosition[]>) {
  const output = {
    _meta: {
      generated: new Date().toISOString(),
      description: "Canonical list of ad positions extracted from templates",
    },
    pageTypes: Object.keys(grouped).map((pageType) => ({
      type: pageType,
      label: pageType.charAt(0).toUpperCase() + pageType.slice(1),
      positions: grouped[pageType].map((pos) => ({
        id: pos.id,
        name: pos.name,
        description: pos.description,
        template: pos.template,
        lineNumber: pos.lineNumber,
      })),
    })),
  };

  return output;
}

function main() {
  console.log("🔍 Extracting ad positions from templates...\n");

  const positions = scanTemplates();

  if (positions.length === 0) {
    console.log("\n⚠️  No ad positions found in templates.");
    console.log("   Make sure your templates use data-ad-position attributes.");
    return;
  }

  console.log(`\n✅ Found ${positions.length} total position(s)\n`);

  const grouped = groupPositionsByPageType(positions);
  const output = generateOutput(grouped);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), "utf-8");

  console.log(`📝 Output written to: ${OUTPUT_FILE}\n`);

  // Print summary
  console.log("📊 Summary by Page Type:");
  for (const [pageType, positions] of Object.entries(grouped)) {
    console.log(`   ${pageType}: ${positions.length} position(s)`);
    positions.forEach((pos) => {
      console.log(`      - ${pos.id} (${pos.template}:${pos.lineNumber})`);
    });
  }

  console.log("\n✨ Done!");
}

// Run the script
main();
