import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { DataStoreProvider } from "./components/_Providers/DataStoreProvider";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <DataStoreProvider>
            <Title>notes</Title>
            <Suspense>{props.children}</Suspense>
          </DataStoreProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
