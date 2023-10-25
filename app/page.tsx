import Link from 'next/link';
import { reader } from './reader';
import './styles.css';

export default async function Homepage() {
  const posts = await reader.collections.posts.all();
  const westpacUI = await reader.singletons.westpacUIInfo.read();

  return (
    <div>
      <h1>Keystatic ⚡️</h1>
      <p>This homepage shows how to load a collection from the reader API.</p>
      <p>
        <a href="/keystatic">Click here to visit the Admin UI</a>, or the link
        below to view a post in the collection.
      </p>
      <h2>Posts</h2>
      <div className="flex">
        <strong>VERSION:</strong>
        <span>{westpacUI?.currentVersion}</span>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
