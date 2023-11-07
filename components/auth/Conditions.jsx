"use client";
import Image from "next/image";
import styles from "../../styles/auth/Conditions.module.css";
import Link from "next/link";
import {
  conditions,
  conf,
  divisibilite,
  interpretations,
  middle,
} from "@/lib/utils/terms";
import { removeHTTPPrefix } from "@/lib/controllers/http.controller";
import Terms from "./Terms";
import { CgClose } from "react-icons/cg";
import ClientOnly from "../ClientOnly";
import { AiOutlineCopy } from "react-icons/ai";
import { VscCheckAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Conditions({
  acceptConditions,
  setAcceptconditions,
  activePopup,
  setActivePopup,
}) {
  const ref = useRef();
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted && scroll) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setScroll(false);
    }
  }, [isMounted, scroll]);
  return (
    <ClientOnly>
      <div className={styles.container}>
        <div>
          <div className={styles.top}>
            <div className={styles.logo}>
              <Image src={"/logo.png"} fill alt="" className={styles.logoImg} />
              <span
                onClick={() =>
                  setActivePopup((prev) => {
                    const nwe = { ...prev };
                    nwe.obj = null;
                    return nwe;
                  })
                }
                className={styles.close}
              >
                <CgClose size={"1.5rem"} />
              </span>
            </div>
            <div className={styles.line} />
          </div>
          <div className={`${styles.contenu} scr`}>
            <div ref={ref}>
              Veuillez lire attentivement ces termes et conditions avant
              d’utiliser notre application.
            </div>
            <div>
              {activePopup?.obj === "cnd" && (
                <>
                  <h1>Termes et Conditions</h1>
                  <div>
                    <h2>Interprétation et définitions</h2>
                    <div className={styles.cond}>
                      {interpretations.map((c) => {
                        return (
                          <div key={c.titre}>
                            <h6>{c.titre}</h6>
                            {c.contenu &&
                              c.contenu.map((cont, i) => {
                                if (cont.list)
                                  return (
                                    <div key={i}>
                                      <div>
                                        {
                                          <ul className={styles.ul}>
                                            {cont.list.map((l, i) => (
                                              <div key={i}>
                                                <li>
                                                  <span className={styles.bold}>
                                                    {l[0]}
                                                  </span>
                                                  <span>{l[1]}</span>
                                                  {l[2]?.link && (
                                                    <span
                                                      className={styles.link}
                                                    >
                                                      <Link
                                                        href={`${l[2].link}`}
                                                        target="_blank"
                                                      >
                                                        {removeHTTPPrefix(
                                                          l[2].link
                                                        )}
                                                      </Link>
                                                    </span>
                                                  )}
                                                </li>
                                              </div>
                                            ))}
                                          </ul>
                                        }
                                      </div>
                                    </div>
                                  );
                                return (
                                  <div key={i}>
                                    <div>{cont}</div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.middleHr} />
                  <div>{middle.desc}</div>
                  <div className={styles.middleHr} />

                  <div>
                    <h2>Conditions particulières</h2>
                    <div className={styles.cond}>
                      {conditions.map((c) => {
                        return (
                          <div key={c.titre}>
                            <h6>{c.titre}</h6>
                            {c.contenu &&
                              c.contenu.map((cont, i) => {
                                if (cont.list)
                                  return (
                                    <div key={i}>
                                      <div>
                                        {
                                          <ul className={styles.ul}>
                                            {cont.list.map((l, i) => (
                                              <div key={i}>
                                                <li>{l}</li>
                                              </div>
                                            ))}
                                          </ul>
                                        }
                                      </div>
                                    </div>
                                  );
                                return (
                                  <div key={i}>
                                    <div>{cont}</div>
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h2>Divisibilité et renonciation </h2>
                    <div className={styles.cond}>
                      {divisibilite.map((c) => {
                        return (
                          <div key={c.titre}>
                            <h6>{c.titre}</h6>
                            {c.contenu &&
                              c.contenu.map((cont, i) => {
                                if (cont.mail)
                                  return (
                                    <div key={i}>
                                      {
                                        <ul className={styles.ul}>
                                          <li
                                            onClick={() => {
                                              navigator.clipboard.writeText(
                                                cont.mail[1]?.adresse
                                              );
                                              setCopied(true);
                                              setTimeout(() => {
                                                setCopied(false);
                                              }, 1500);
                                            }}
                                          >
                                            <span>{cont.mail[0]}</span>
                                            <label className={styles.adr}>
                                              {cont.mail[1]?.adresse}
                                              <span className={styles.copy}>
                                                {copied ? (
                                                  <VscCheckAll />
                                                ) : (
                                                  <AiOutlineCopy />
                                                )}
                                                <span className={styles.badge}>
                                                  {copied ? "Copié" : "Copier"}
                                                </span>
                                              </span>
                                            </label>
                                          </li>
                                        </ul>
                                      }
                                    </div>
                                  );
                                return <div key={i}>{cont}</div>;
                              })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {activePopup?.obj === "cnf" && (
                <>
                  <h1>Politiques de confidentialité</h1>
                  <div>
                    <h2>Divisibilité et renonciation </h2>
                    <div className={styles.cond}>
                      {conf.map((c, i) => {
                        return (
                          <div key={c.titre ? c.titre : i}>
                            {c.titre && <h6>{c.titre}</h6>}
                            {c.contenu &&
                              c.contenu.map((cont, i) => {
                                if (cont.list)
                                  return (
                                    <div key={i}>
                                      {
                                        <ul className={styles.ul}>
                                          {cont.list.map((l, i) => (
                                            <div key={i}>
                                              <li>{l}</li>
                                            </div>
                                          ))}
                                        </ul>
                                      }
                                    </div>
                                  );
                                if (cont.withMail)
                                  return (
                                    <label
                                      key={i}
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          cont.withMail[1].adresse
                                        );
                                        setCopied(true);
                                        setTimeout(() => {
                                          setCopied(false);
                                        }, 1500);
                                      }}
                                    >
                                      <span>{cont.withMail[0]}</span>
                                      <label className={styles.adr}>
                                        {cont.withMail[1].adresse}{" "}
                                        <span className={styles.copy}>
                                          {copied ? (
                                            <VscCheckAll />
                                          ) : (
                                            <AiOutlineCopy />
                                          )}
                                          <span className={styles.badge}>
                                            {copied ? "Copié" : "Copier"}
                                          </span>
                                        </span>
                                      </label>
                                    </label>
                                  );
                                return <div key={i}>{cont}</div>;
                              })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.sp} />
            <div className={styles.li}>
              <Terms
                setAcceptconditions={setAcceptconditions}
                acceptConditions={acceptConditions}
                activePopup={activePopup}
                setActivePopup={setActivePopup}
                setScroll={setScroll}
                on
              />
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
