"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  const userInfo = useUser();
  const navigate = useRouter();

  const handleGetStarted = () => {
    if (userInfo && userInfo.id) {
      navigate.push(`/dashboard`);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Master Technical Interviews & Boost Your Coding Skills
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Prepare for technical interviews with AI-powered mock interviews,
              personalized learning paths, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {userInfo && userInfo.id ? (
                <Button
                  type="button"
                  onClick={handleGetStarted}
                  className="gap-2 cursor-pointer group"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button type="button" className="gap-2 cursor-pointer group">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">1000+ Coding Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">AI-Powered Mock Interviews</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm">Personalized Learning</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Interview preparation platform dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Success Rate</p>
                  <p className="text-sm text-muted-foreground">
                    85% of our users get hired
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
