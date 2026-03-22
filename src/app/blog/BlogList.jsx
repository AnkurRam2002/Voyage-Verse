"use client"

import { useState, useEffect, useCallback } from "react"
import PostCard from "@/components/postCard/postCard"
import styles from "./blog.module.css"
import { Search, MapPin, X, LayoutGrid, List } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const BASE_URL = process.env.NEXT_PUBLIC_DEV_URL || "";

const BlogList = ({ posts: initialPosts }) => {
  const [query, setQuery]       = useState("")
  const [location, setLocation] = useState("")
  const [posts, setPosts]       = useState(initialPosts)
  const [loading, setLoading]   = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid | list

  const hasFilters = query || location;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query)    params.set("q",        query);
      if (location) params.set("location", location);

      const url = `${BASE_URL}/api/blog/search?${params.toString()}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, [query, location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchPosts]);

  const clearFilters = () => {
    setQuery("");
    setLocation("");
  };

  return (
    <div className={styles.blogWrapper}>

      {/* ── Search + Filter Bar ─────────────────────────── */}
      <div className={styles.filterBar}>
        {/* Full-text search */}
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search stories, destinations..."
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Location filter */}
        <div className={styles.filterInputWrapper}>
          <MapPin className={styles.filterIcon} size={16} />
          <input
            type="text"
            placeholder="Filter by location..."
            className={styles.filterInput}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.viewToggle}>
          <button 
            className={`${styles.toggleBtn} ${viewMode === "grid" ? styles.activeToggle : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            className={`${styles.toggleBtn} ${viewMode === "list" ? styles.activeToggle : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button className={styles.clearBtn} onClick={clearFilters} title="Clear filters">
            <X size={16} /> Clear
          </button>
        )}
      </div>

      {hasFilters && !loading && (
        <p className={styles.resultCount}>
          {posts.length} {posts.length === 1 ? "story" : "stories"} found
        </p>
      )}

      {/* ── Loading skeleton ──────────────────────────────── */}
      {loading && (
        <div className={viewMode === "grid" ? styles.grid : styles.list}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={viewMode === "grid" ? styles.skeleton : styles.skeletonList} />
          ))}
        </div>
      )}

      {/* ── Post Grid/List ───────────────────────────────────── */}
      {!loading && (
        <div className={viewMode === "grid" ? styles.grid : styles.list}>
          <AnimatePresence mode='popLayout'>
            {posts.map((post, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: Math.min(index * 0.04, 0.4) }}
                key={post._id}
                className={styles.post}
              >
                <PostCard post={post} view={viewMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className={styles.noResults}>
          <p>No stories found. Try adjusting your search or filters.</p>
          {hasFilters && (
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogList
