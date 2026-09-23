import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ArchivePage from './pages/ArchivePage';
import ContactPage from './pages/ContactPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/home-two"
          element={
            <Layout dark>
              <HomePage dark />
            </Layout>
          }
        />
        <Route
          path="/home-three"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/business"
          element={
            <Layout>
              <CategoryPage title="Business" />
            </Layout>
          }
        />
        <Route
          path="/entertainment"
          element={
            <Layout>
              <CategoryPage title="Entertainment" />
            </Layout>
          }
        />
        <Route
          path="/features"
          element={
            <Layout>
              <CategoryPage title="Features" />
            </Layout>
          }
        />
        <Route
          path="/trending"
          element={
            <Layout>
              <CategoryPage title="Trending" />
            </Layout>
          }
        />
        <Route
          path="/sports"
          element={
            <Layout>
              <CategoryPage title="Sports" />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/archive"
          element={
            <Layout>
              <ArchivePage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/post1"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/post2"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/post3"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/video_post1"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/video_post2"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/video_post3"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/audio_post1"
          element={
            <Layout>
              <PostDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/404"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
