"use client"

import useHappening from "@/hooks/useHappening";
import { useEffect, useState } from "react";
import { HappeningType } from "@/types/type";
import Link from "next/link";
import Happenings from "@/components/Happenings";
import Info from "@/components/Info";
import SignUp from "@/components/SignUp";


export default function HomePage() {
  return(
    <SignUp />
    // <LogIn />
    // <Info />
  )
}