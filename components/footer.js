import Container from './container'

export default function Footer() {
  return (
    <footer className="p-3 mt-10 text-center bg-gray-800 flex-column">
      <Container>
          <div className="flex flex-row justify-evenly">
        <p>Copyright © 2020  Richard McSorley. All rights reserved.</p>
          </div>
      </Container>
    </footer>
  )
}
