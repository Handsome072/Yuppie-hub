"use client";
import { activeUserCompteController } from "@/lib/controllers/auth.controller";
import { verifyJWTController } from "@/lib/controllers/jwt.controller";
import { isEmpty } from "@/lib/utils/isEmpty";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../Spinner";

export default function ActivateUserCompte({ token }) {
  const [spinner, setSpinner] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let res;
    async () => {
      setSpinner(true);
      res = await verifyJWTController(token);
      setSpinner(false);
      if (!isEmpty(res) && res?.secure) {
        res = await activeUserCompteController({
          id: res.infos.id,
          token: res.infos.token,
        });
        if (res?.compteActive) {
          setIsActive(true);
        }
      }
    };
  }, []);
  if (isEmpty(token) && typeof window !== "undefined") {
    push("/login");
  } else if (spinner) return <Spinner />;
  return <div></div>;
}
