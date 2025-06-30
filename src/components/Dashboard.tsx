"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import DashboardMenu from "@/components/DashboardMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Settings } from "./Settings";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const DashboardPanel = ({ userData }) => {
  const [activeCategory, setActiveCategory] = useState("mockups");

  return (
    <>
      <DashboardMenu
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      <Card
        variant="flat"
        className="min-h-[calc(100vh-262px)] w-full justify-start gap-0 p-2 sm:h-[calc(100vh-184px)] sm:overflow-y-auto"
      >
        <span className="mx-2 mt-2 mb-3 font-serif text-xl">
          {activeCategory}
        </span>
        <DashboardContent userData={userData} activeCategory={activeCategory} />
      </Card>
    </>
  );
};

const DashboardContent = ({ userData, activeCategory }) => {
  const mockups = userData.mockups?.map((mockup) => (
    <li
      key={mockup.id}
      className="hover:bg-background/10 flex cursor-pointer items-center justify-start gap-3 rounded-lg p-2 transition duration-300"
    >
      <Avatar className="h-13 w-13">
        <div className="droplet h-12 w-12 rounded-full" />
        <AvatarImage src={mockup.avatar_url || ""} />
      </Avatar>
      <span className="font-semibold">{`@${mockup.username}`}</span>
    </li>
  ));

  const journals = userData.journals?.map((jorunal) => (
    <li
      key={jorunal.id}
      className="hover:bg-background/10 flex cursor-pointer items-center justify-start gap-3 rounded-lg p-2 transition duration-300"
    >
      <span className="font-semibold">{`@${jorunal.title}`}</span>
    </li>
  ));

  switch (activeCategory) {
    case "mockups":
      return (
        <>
          <Link
            href="dashboard/mockup-studio/new"
            className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300"
          >
            <Button variant={"droplet"} size={"rounded"}>
              <IoAdd className="text-foreground/80" />
            </Button>
            <span className="text-foreground/80 italic">
              create a new mockup
            </span>
          </Link>
          <ul className="flex flex-col">{mockups}</ul>
        </>
      );

    case "journals":
      return (
        <>
          <div className="hover:bg-background/10 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition duration-300">
            <Button variant={"droplet"} size={"rounded"}>
              <IoAdd className="text-foreground/80" />
            </Button>
            <span className="text-foreground/80 italic">
              write a new journal
            </span>
          </div>
          <ul className="flex flex-col">{journals}</ul>
        </>
      );

    case "affirmations":
      return <p className="mx-2 mt-2">Affirmations go here</p>;

    case "soulscapes":
      return <p className="mx-2 mt-2">Soulscapes coming soon</p>;

    case "settings":
      return <Settings />;

    default:
      return <p className="mx-2 mt-2">Nothing selected</p>;
  }
};
