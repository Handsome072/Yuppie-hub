const src = process.env.URL;
export const resetPassword = ({ email, userType, token, lang }) => {
  if (userType === "assistant")
    return {
      html: `
        <!DOCTYPE html>
        <html lang="${lang}">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Email</title>
          </head>
          <body>
            <table
              style="
                position: relative;
                background: #ebebeb;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                scroll-behavior: smooth;
                box-sizing: border-box;
                color: inherit;
                text-overflow: ellipsis;
                text-decoration: inherit;
                border: inherit;
                outline: inherit;
                font-family: 'Archivo', sans-serif;
                padding: 0 2rem 2rem 2rem;
              "
            >
              <tr>
                <td>
                  <p></p>
                </td>
              </tr>
              <tr>
                <td>
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 100%; text-align: center">
                        <img
                          style="height: 3rem; scale: 2;"
                          src="${src}/logo.png"
                          alt="Yuppie HUB"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <table
                        style="
                          background: #fff;
                          padding: 20px;
                          width: 100%;
                          border-radius: 4px;
                          height: 100%;
                          box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
                        "
                      >
                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: #036eff;
                              font-weight: 500;
                              font-size: 1.5rem;
                              text-align: center;
                              margin: 0.5rem 0;
                              text-transform: uppercase;
                            "
                          >
                            Réinitialisation de mot de passe
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 100%; color: #888; text-align: center">
                            <p>
                              Vous avez demandez une réinitialisation de votre mot de
                              passe (<span style="color: #036eff">${email}</span>) en
                              tant qu'assistant.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 100%; color: #888; text-align: center">
                            <a
                              href="${src}/reset/${token}"
                              style="
                                padding: 0.65rem 1rem;
                                position: relative;
                                width: 100%;
                                color: #fff;
                                font-weight: bold;
                                border: none;
                                border-radius: 0.5rem;
                                cursor: pointer;
                                transition: 0.1s ease-out;
                                box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                                  rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
                                text-transform: uppercase;
                                text-decoration: none;
                                background: linear-gradient(135deg, #badf5b, #036eff);
                              "
                              target="_blank"
                              rel="noopener noreferrer"
                              onmouseover="this.style.boxShadow='rgba(0, 0, 0, 0.15) 0px 2px 14px 2px, rgba(0, 0, 0, 0.3) 0px 1px 5px 2px'"
                              onmouseout="this.style.boxShadow='rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'"
                            >
                              Réinitialiser
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p></p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: rgba(0, 0, 0, 0.7);
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            En cas de difficulté, n'hésitez pas à nous contacter.
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: rgba(0, 0, 0, 0.7);
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            A bientôt.
                          </td>
                        </tr>
                      </table>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>

        `,
    };

  return {
    html: `
      <!DOCTYPE html>
        <html lang="${lang}">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Email</title>
          </head>
          <body>
            <table
              style="
                position: relative;
                background: #ebebeb;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                scroll-behavior: smooth;
                box-sizing: border-box;
                color: inherit;
                text-overflow: ellipsis;
                text-decoration: inherit;
                border: inherit;
                outline: inherit;
                font-family: 'Archivo', sans-serif;
                padding: 0 2rem 2rem 2rem;
              "
            >
              <tr>
                <td>
                  <p></p>
                </td>
              </tr>
              <tr>
                <td>
                  <table style="width: 100%">
                    <tr>
                      <td style="width: 100%; text-align: center">
                        <img
                          style="height: 3rem; scale: 2;"
                          src="${src}/logo.png"
                          alt="Yuppie HUB"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p></p>
                      </td>
                    </tr>
                    <tr>
                      <table
                        style="
                          background: #fff;
                          padding: 20px;
                          width: 100%;
                          border-radius: 4px;
                          height: 100%;
                          box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
                        "
                      >
                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: #036eff;
                              font-weight: 500;
                              font-size: 1.5rem;
                              text-align: center;
                              margin: 0.5rem 0;
                              text-transform: uppercase;
                            "
                          >
                            Réinitialisation de mot de passe
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 100%; color: #888; text-align: center">
                            <p>
                              Vous avez demandez une réinitialisation de votre mot de
                              passe (<span style="color: #036eff">${email}</span>) en
                              tant qu'assistant.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 100%; color: #888; text-align: center">
                            <a
                              href="${src}/reset/${token}"
                              style="
                                padding: 0.65rem 1rem;
                                position: relative;
                                width: 100%;
                                color: #fff;
                                font-weight: bold;
                                border: none;
                                border-radius: 0.5rem;
                                cursor: pointer;
                                transition: 0.1s ease-out;
                                box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                                  rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
                                text-transform: uppercase;
                                text-decoration: none;
                                background: linear-gradient(135deg, #badf5b, #036eff);
                              "
                              target="_blank"
                              rel="noopener noreferrer"
                              onmouseover="this.style.boxShadow='rgba(0, 0, 0, 0.15) 0px 2px 14px 2px, rgba(0, 0, 0, 0.3) 0px 1px 5px 2px'"
                              onmouseout="this.style.boxShadow='rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px'"
                            >
                              Réinitialiser
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p></p>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: rgba(0, 0, 0, 0.7);
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            En cas de difficulté, n'hésitez pas à nous contacter.
                          </td>
                        </tr>

                        <tr>
                          <td
                            style="
                              width: 100%;
                              color: rgba(0, 0, 0, 0.7);
                              font-weight: bold;
                              text-align: center;
                            "
                          >
                            A bientôt.
                          </td>
                        </tr>
                      </table>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>

 `,
  };
};
