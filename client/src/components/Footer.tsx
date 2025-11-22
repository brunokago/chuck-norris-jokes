export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm">
            &copy; {currentYear} Chuck Norris Jokes App. All rights reserved.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            Powered by{" "}
            <a
              href="https://api.chucknorris.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline"
            >
              Chuck Norris API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
