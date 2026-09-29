'use client'

import { useState } from 'react'
import { Link, Button, Spinner } from '@heroui/react'
import { authClient, useSession } from '@/lib/auth-client'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { data: session, isPending } = useSession()

  const isLoggedIn = !!session?.user

  const handleLogout = async () => {
    await authClient.signOut()
    setIsMenuOpen(false)
  }

  const userName = session?.user?.name || session?.user?.email || 'User'

  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0f12]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400 text-lg font-black text-black shadow-lg shadow-lime-400/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lime-400/40">
            A
          </div>

          <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-lime-400">
            ACME
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
          <Link
            href="/features"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Features
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-lime-400"
          >
            Dashboard
          </Link>

          <Link
            href="/pricing"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Pricing
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="flex h-10 min-w-28 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4">
              <Spinner size="sm" className="text-lime-400" />
            </div>
          ) : isLoggedIn ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-black">
                  {userInitial}
                </div>

                <span className="max-w-32 truncate text-sm font-medium text-white/80">
                  {userName}
                </span>
              </div>

              <Button
                size="sm"
                variant="flat"
                color="danger"
                onPress={handleLogout}
                className="font-semibold transition-all duration-300 hover:scale-105"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-3 duration-500">
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>

              <Button
                as={Link}
                href="/sign-up"
                size="sm"
                className="rounded-full bg-lime-400 px-5 font-bold text-black shadow-lg shadow-lime-400/10 transition-all duration-300 hover:scale-105 hover:bg-lime-300 hover:shadow-lime-400/30"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all duration-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                isMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />

            <span
              className={`h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </header>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0d0f12]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMenuOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            <Link
              href="/features"
              onPress={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:pl-6 hover:text-white"
            >
              Features
            </Link>

            <Link
              href="/dashboard"
              onPress={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:pl-6 hover:text-lime-400"
            >
              Dashboard
            </Link>

            <Link
              href="/pricing"
              onPress={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:pl-6 hover:text-white"
            >
              Pricing
            </Link>

            <div className="my-3 h-px bg-white/10" />

            {isPending ? (
              <div className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Spinner size="sm" className="text-lime-400" />
                  Loading...
                </div>
              </div>
            ) : isLoggedIn ? (
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-black shadow-lg shadow-lime-400/20">
                    {userInitial}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/40">Logged in as</p>

                    <p className="truncate text-sm font-medium text-white">
                      {userName}
                    </p>
                  </div>
                </div>

                <Button
                  color="danger"
                  variant="flat"
                  className="w-full font-semibold transition-all duration-300 hover:scale-[1.02]"
                  onPress={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Link
                  href="/sign-in"
                  onPress={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-center text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-white"
                >
                  Login
                </Link>

                <Button
                  as={Link}
                  href="/sign-up"
                  className="w-full rounded-xl bg-lime-400 font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-300"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
