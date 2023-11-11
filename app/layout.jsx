import "./globals.css";
import "../assets/mdi/css/materialdesignicons.min.css"; // icons
import { UidContextProvider } from "@/context/UidContext";
import ReduxProvider from "@/redux/ReduxProvider";
import connectToMongo from "@/lib/db";

export const metadata = {
  title: "Yuppie HUB",
  description: `Application web & mobile de mise en relation permettant aux entrepreneurs débordés d’entrer en contact avec des assistantes virtuelles en vue de déléguer les tâches chronophages ou non pour son business.
  Alors, que ce soit un entrepreneur ambitieux avec des projets plein la tête ou que ce soit un(e) étudiant(e) ou travailleur(e) autonome/Freelancer souhaitant rentabiliser son temps libre, Yuppie Hub est la solution la plus simple et rapide. 
  `,
};

export default async function RootLayout({ children }) {
  await connectToMongo();
  return (
    <html lang="fr">
      <body>
        <ReduxProvider>
          <UidContextProvider>{children}</UidContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
