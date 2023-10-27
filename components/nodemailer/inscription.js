const src = process.env.LOGO_URL;
export const generateEmail = ({ name, username, userType }) => {
  if (userType === "assistant")
    return {
      html: `
           <!DOCTYPE html>
            <html lang="en">
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
                    padding: 2rem;
                  "
                >
                  <tr>
                    <td>
                      <table style="width: 100%;">
                        <tr>
                          <td style="width: 100%; text-align: center">
                               <img style="height:4rem" src="${src}/logo.png"
                              alt="Yuppie HUB"
                               />
                          </td>
                        </tr>
                        <tr>
                          <table
                            style="
                              background: #fff;
                              padding: 20px;
                              width: 100%;
                              border-radius: 8px;
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
                                "
                              >
                               INSCRIPTION
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 100%;">
                                <p
                                  style="font-weight: 600; text-align: center;"
                                >
                                  Bonjour <span class="nm"> ${username} ${name} </span>
                                </p>  
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 100%; color: #888; text-align: center">
                                Vous êtes inscrit en tant qu'assistant sur l'application yuppie hub.
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
            <html lang="en">
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
                    padding: 2rem;
                  "
                >
                  <tr>
                    <td>
                      <table style="width: 100%;">
                        <tr>
                          <td style="width: 100%; text-align: center">
                              <img height:4rem"  src="${src}/logo.png"
                              alt="Yuppie HUB"
                               />
                          </td>
                        </tr>
                        <tr>
                          <table
                            style="
                              background: #fff;
                              padding: 20px;
                              width: 100%;
                              border-radius: 8px;
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
                                "
                              >
                               INSCRIPTION
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 100%;">
                                <p
                                  style="font-weight: 600; text-align: center;"
                                >
                                  Bonjour <span class="nm"> ${username} ${name} </span>
                                </p>  
                              </td>
                            </tr>
                            <tr>
                              <td style="width: 100%; color: #888; text-align: center">
                                Vous êtes inscrit en tant que client sur l'application yuppie hub.
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
