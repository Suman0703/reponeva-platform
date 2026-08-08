import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "./AuthContext";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { user } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Loads once whenever login state changes — logging out clears the set
  // immediately rather than leaving a stale logged-in user's bookmarks
  // visually marked for whoever's browsing next.
  useEffect(() => {
    if (!user) {
      setBookmarkedIds(new Set());
      return;
    }
    api.get("/bookmarks/ids").then((res) => {
      setBookmarkedIds(new Set(res.data));
    });
  }, [user]);

  async function toggleBookmark(repo) {
    const isBookmarked = bookmarkedIds.has(repo.githubId);

    // Optimistic update — the heart fills/empties instantly on click,
    // rather than waiting on a round trip, which would feel laggy for
    // an action this small and frequent.
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      isBookmarked ? next.delete(repo.githubId) : next.add(repo.githubId);
      return next;
    });

    try {
      if (isBookmarked) {
        await api.delete(`/bookmarks/${repo.githubId}`);
      } else {
        await api.post("/bookmarks", {
          githubId: repo.githubId,
          fullName: repo.fullName,
          description: repo.description,
          url: repo.url,
          language: repo.language,
          topics: repo.topics,
          stars: repo.stars,
          forks: repo.forks,
        });
      }
    } catch {
      // Revert the optimistic change if the actual request failed, so the
      // UI doesn't lie about a bookmark that didn't really save/remove.
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        isBookmarked ? next.add(repo.githubId) : next.delete(repo.githubId);
        return next;
      });
    }
  }

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}