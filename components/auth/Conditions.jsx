import Image from "next/image";
import styles from "../../styles/auth/Conditions.module.css";
import logo from "../../assets/logo.png";
import Link from "next/link";
import {
  conditions,
  conf,
  divisibilite,
  interpretations,
  middle,
} from "@/lib/utils/terms";
import { removeHTTPPrefix } from "@/lib/controllers/http.controller";
import Copy from "../copy/Copy";
import Close from "../copy/Close";
import Terms from "../copy/Terms";

export default function Conditions({
  setShowConditions,
  acceptConditions,
  setAcceptconditions,
}) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.top}>
            <div className={styles.logo}>
              <Image src={logo} fill alt="" className={styles.logoImg} />
              <Close setShowConditions={setShowConditions} />
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.contenu}>
            <div>
              Veuillez lire attentivement ces termes et conditions avant
              d’utiliser notre application.
            </div>
            <div>
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
                                                <span className={styles.link}>
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
              <div className={styles.middle}>
                <div>{middle.desc}</div>
              </div>
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
                                  <div>
                                    {
                                      <ul className={styles.ul}>
                                        <li>
                                          <span>{cont.mail[0]}</span>
                                          <Copy text={cont.mail[1]?.adresse} />
                                        </li>
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
                            if (cont.withMail)
                              return (
                                <div key={i}>
                                  <div>
                                    <span>{cont.withMail[0]}</span>
                                    <Copy text={cont.withMail[1].adresse} />
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
            </div>
            <Terms
              setShowConditions={setShowConditions}
              setAcceptconditions={setAcceptconditions}
              acceptConditions={acceptConditions}
              on
            />
          </div>
        </div>
      </div>
    </>
  );
}
