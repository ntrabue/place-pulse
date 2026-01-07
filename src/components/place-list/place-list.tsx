import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { TableView } from "../table-view";
import { CardsView } from "../cards-view";
import { Table, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Business } from "../../types/business";

export function PlaceList({ results }: { results: Business[] }) {
  const [activeView, setActiveView] = useState<string>("card");

  if (!results.length){
    return null;
  }

  return (
    <>
      <Tabs value={activeView} onValueChange={setActiveView}>
        <TabsList className="mb-4">
          <TabsTrigger value="table">
            <Table className="w-4 h-4 mr-2" />
            Table
          </TabsTrigger>
          <TabsTrigger value="cards">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <TableView businesses={results} />
        </TabsContent>

        <TabsContent value="cards">
          <CardsView businesses={results} />
        </TabsContent>
      </Tabs>
    </>
  );
}
