import React from "react";
import Layout from "../../components/Layout";

const Console = () => {
  const x = 100;
  console.log(x);

  console.group("group");
  console.error("error");
  console.warn("warn");
  console.table({ name: "Brad", email: "brad@brad" });
  console.groupEnd();

  const styles =
    "padding: 1rem; border: 1px solid black; background-color: red; color: white;";
  console.log("%cstyles", styles);

  return (
    <>
      <Layout pageName="console">
        <p>console</p>
      </Layout>
    </>
  );
};

export default Console;
