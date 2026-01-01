import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-purple-500/20 py-12 bg-slate-900/30 backdrop-blur-xl">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Pick N Learn</h3>
            <p className="text-gray-400 text-sm">
              Your complete fantasy cricket education platform. Learn, practice, and excel.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link href="/lessons"><a className="text-gray-400 hover:text-white text-sm transition-colors">All Lessons</a></Link></li>
              <li><Link href="/quizzes"><a className="text-gray-400 hover:text-white text-sm transition-colors">Quizzes</a></Link></li>
              <li><Link href="/glossary"><a className="text-gray-400 hover:text-white text-sm transition-colors">Glossary</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard"><a className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</a></Link></li>
              <li><Link href="/about"><a className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms"><a className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</a></Link></li>
              <li><Link href="/privacy"><a className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/responsible-learning"><a className="text-gray-400 hover:text-white text-sm transition-colors">Responsible Learning</a></Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm space-y-2">
          <p>&copy; 2025 Pick N Learn. All rights reserved. Built for fantasy cricket enthusiasts.</p>
          <p className="text-xs">
            This is an independent educational platform. Not affiliated with any fantasy sports operator or cricket organization.
          </p>
        </div>
      </div>
    </footer>
  );
}
