import Link from 'next/link'

export default function Header({isHome = false}) {
  return (
    <section className="flex flex-col items-center mt-8 mb-8 md:flex-row md:justify-between md:mb-6">
    <h2 className="mt-1 mb-5 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/">
          <a className="hover:underline">{isHome? 'Blog' : 'Home'}</a>
      </Link>
    </h2>
        <h2 className="mt-1 mb-5 text-2xl font-light leading-tight tracking-tight">
        A blog of sorts.
    </h2>
    </section>
  )
}
