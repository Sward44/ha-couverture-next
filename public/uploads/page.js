import Head from 'next/head';

function ImagePage() {
  return (
    <div>
      <Head>
        <meta name="robots" content="nofollow, noindex" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self';" />
      </Head>
      <img src="/uploads/201f0276-c7a8-4f43-a2da-3c861195eac7.png" alt="Image" />
    </div>
  );
}