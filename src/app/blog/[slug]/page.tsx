import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { POSTS, postBySlug, formatPostDate } from "@/lib/blog";
import { GRADIENT } from "@/lib/destinations";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      siteName: SITE.name,
      locale: "pt_BR",
      publishedTime: post.date,
      images: [`${SITE.url}/blog/${post.slug}.jpg`],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE.url}/blog/${post.slug}.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex items-center gap-1 text-sm text-muted">
        <Link href="/blog" className="hover:text-ink">Blog</Link>
        <Icon name="chevR" size={14} color="var(--muted-2)" />
        <span className="truncate">{post.title}</span>
      </nav>

      <div className="mt-3 text-[13px] font-semibold text-muted-2">
        {formatPostDate(post.date)} · {post.readMins} min de leitura
      </div>
      <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-[40px]">
        {post.title}
      </h1>

      <div
        className="mt-5 h-[220px] w-full overflow-hidden rounded-[20px] sm:h-[300px]"
        style={{
          backgroundImage: `url('/blog/${post.slug}.jpg'), ${GRADIENT[post.tone]}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="prose-doc mt-7">
        {post.blocks.map((b, i) => (
          <div key={i}>
            {b.h2 && <h2>{b.h2}</h2>}
            {b.p && <p>{b.p}</p>}
            {b.ul && (
              <ul>
                {b.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-[22px] border border-line bg-surface p-7 text-center">
        <h2 className="font-display text-xl font-bold tracking-tight">Pronto para achar sua passagem?</h2>
        <p className="max-w-md text-sm text-muted">
          Compare GOL, LATAM, Azul e +20 companhias e ache o melhor preço em reais.
        </p>
        <Link href="/" className="btn-coral inline-flex items-center gap-2 rounded-[15px] px-6 py-3 text-sm font-bold text-white">
          <Icon name="search" size={18} stroke={2.4} color="#fff" /> Buscar voos baratos
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-bold tracking-tight">Leia também</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {POSTS.filter((p) => p.slug !== post.slug).slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-[16px] border border-line bg-surface p-4 transition-shadow hover:shadow-md">
              <div className="font-display text-[15px] font-bold leading-tight">{p.title}</div>
              <div className="mt-1 text-[13px] text-muted-2">{p.readMins} min</div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
