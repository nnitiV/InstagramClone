"use client";
import { useThemeStore } from '@/stores/useThemeStore';
import { useEffect } from 'react'

export default function ThemeWatcher() {
    const theme = useThemeStore(state => state.theme);
    useEffect(() => document.documentElement.setAttribute("data-bs-theme", theme), [theme])
  return null;
}
