import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        backgroundImage: 'url("/img/rrg-sunset.jpg")',
      }}
      className="text-gray-100"
    >
      <SEO title="404: Not Found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
