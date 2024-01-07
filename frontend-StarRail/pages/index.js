import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>崩坏：星穹铁道</title>
      </Head>

    </Layout>
  );
}

