"use client";

import { useEffect, useState, useRef } from "react";

// Finland vs USA Comparison
export function FinlandComparison({
  finlandLabel,
  usaLabel,
  minutesLabel,
  hoursLabel,
  caption,
}: {
  finlandLabel: string;
  usaLabel: string;
  minutesLabel: string;
  hoursLabel: string;
  caption: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-12 grid grid-cols-2 gap-4">
      <div
        className={`bg-[#2d5a3d] text-white p-6 rounded-lg text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-sm uppercase tracking-wide opacity-80 mb-2">{finlandLabel}</div>
        <div className="text-4xl md:text-5xl font-bold mb-1">30</div>
        <div className="text-lg opacity-90">{minutesLabel}</div>
      </div>
      <div
        className={`bg-[#dc6b5a] text-white p-6 rounded-lg text-center transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="text-sm uppercase tracking-wide opacity-80 mb-2">{usaLabel}</div>
        <div className="text-4xl md:text-5xl font-bold mb-1">2-3</div>
        <div className="text-lg opacity-90">{hoursLabel}</div>
      </div>
      <div
        className={`col-span-2 text-center mt-2 text-[#666] transition-all duration-500 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-lg font-medium">{caption}</p>
      </div>
    </div>
  );
}

// What Actually Works Chart
export function WhatWorksChart({
  title,
  items,
  source,
  monthSuffix,
}: {
  title: string;
  items: Array<{ label: string; months: number; color: string }>;
  source: string;
  monthSuffix: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const maxMonths = 8;

  return (
    <div ref={ref} className="my-12 bg-[#FAF9F6] p-6 md:p-8 rounded-lg">
      <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center gap-4">
            <div className="w-40 md:w-48 text-sm text-[#444] shrink-0">
              {item.label}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                style={{
                  width: isVisible
                    ? `${item.months > 0 ? (item.months / maxMonths) * 100 : 5}%`
                    : "0%",
                  backgroundColor: item.color,
                  transitionDelay: `${index * 150}ms`,
                }}
                >
                  <span className="text-white text-sm font-medium">
                  {item.months > 0 ? `+${item.months} ${monthSuffix}` : "0"}
                  </span>
                </div>
              </div>
            </div>
        ))}
      </div>
      <p className="text-xs text-[#999] mt-4">
        {source}
      </p>
    </div>
  );
}

// Dinner Table Words Comparison
export function DinnerTableWords({
  title,
  leftLabel,
  rightLabel,
  caption,
  source,
}: {
  title: string;
  leftLabel: string;
  rightLabel: string;
  caption: string;
  source: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animate count up
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCount1(Math.round(1000 * eased));
      setCount2(Math.round(143 * eased));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={ref} className="my-12 bg-[#2d5a3d] text-white p-8 rounded-lg">
      <h3 className="text-center text-lg opacity-80 mb-6">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <div className="text-5xl md:text-6xl font-bold mb-2">
            {count1.toLocaleString()}
          </div>
          <div className="text-sm opacity-80">
            {leftLabel.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-5xl md:text-6xl font-bold mb-2 opacity-60">
            {count2}
          </div>
          <div className="text-sm opacity-80">
            {rightLabel.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-6 text-lg font-medium">
        {caption}
      </p>
      <p className="text-xs text-center opacity-60 mt-4">
        {source}
      </p>
    </div>
  );
}

// Third Grader Shocker Callout
export function ThirdGraderCallout({
  title,
  main,
  subPrefix,
  subEmphasis,
  subSuffix,
}: {
  title: string;
  main: string;
  subPrefix: string;
  subEmphasis: string;
  subSuffix: string;
}) {
  return (
    <div className="my-12 bg-[#dc6b5a] text-white p-8 rounded-lg text-center">
      <div className="text-lg opacity-80 mb-2">{title}</div>
      <div className="text-2xl md:text-3xl font-bold mb-4">
        {main}
      </div>
      <div className="text-lg opacity-90">
        {subPrefix} <span className="font-bold">{subEmphasis}</span>
        {subSuffix}
      </div>
    </div>
  );
}
