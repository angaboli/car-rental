import Image from 'next/image'
import dynamic from 'next/dynamic'
import Hero from '../components/hero'
import Decouvrez from '../components/decouvrez'
import Categorie from '../components/categories'
import Processus from '../components/processus'
const DynamicContactWithNoSSR = dynamic(
  () => import('../components/contact'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <Decouvrez />
      <Categorie />
      <Processus />
      <DynamicContactWithNoSSR />
    </main>
  )
}
