"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import type { Category } from "@/types";
import { categoryService } from "@/services/categories";
import { CategoryModal } from "@/components/CategoryModal";

export default function CategoriesPage() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      loadCategories();
    }
  }, [isAuthenticated, refreshKey]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter((c) => c.id !== id));
      } catch (err) {
        console.error("Failed to delete category:", err);
      }
    }
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const incomeCategories = categories.filter((c) => c.type === "income");
  const expenseCategories = categories.filter((c) => c.type === "expense");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Categories</h1>
              <p className="text-muted-foreground mt-2">
                Manage your income and expense categories
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-card border border-border hover:bg-background rounded-lg transition"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-danger hover:bg-danger/80 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Add Category Button */}
          <motion.button
            onClick={handleAddClick}
            className="mb-8 px-6 py-3 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded-lg font-medium transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Category
          </motion.button>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Income Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-success">
                Income Categories
              </h2>
              <div className="space-y-3">
                {incomeCategories.length === 0 ? (
                  <div className="p-4 bg-card border border-border rounded-lg text-center text-muted-foreground">
                    No income categories yet
                  </div>
                ) : (
                  incomeCategories.map((category, idx) => (
                    <motion.div
                      key={category.id}
                      className="p-4 bg-card border border-border rounded-lg flex justify-between items-center hover:border-success transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="px-3 py-1 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="px-3 py-1 bg-danger hover:bg-danger/80 text-white rounded text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Expense Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-danger">
                Expense Categories
              </h2>
              <div className="space-y-3">
                {expenseCategories.length === 0 ? (
                  <div className="p-4 bg-card border border-border rounded-lg text-center text-muted-foreground">
                    No expense categories yet
                  </div>
                ) : (
                  expenseCategories.map((category, idx) => (
                    <motion.div
                      key={category.id}
                      className="p-4 bg-card border border-border rounded-lg flex justify-between items-center hover:border-danger transition"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="px-3 py-1 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded text-sm transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="px-3 py-1 bg-danger hover:bg-danger/80 text-white rounded text-sm transition"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        category={selectedCategory || undefined}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
