"use client"

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import Happenings from "@/components/Happenings";
import Info from "@/components/Info";


export default function HomePage() {
  return(
    <Happenings />
    // <LogIn />
    // <Info />
  )
}