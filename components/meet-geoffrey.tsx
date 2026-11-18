import Link from "next/link";

export function MeetGeoffrey({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="group wrap meet" aria-labelledby="ascent-about-title">
      <div className="meet-name">
        <span className="monogram" aria-hidden="true">
          GW
        </span>
        <span>
          Geoffrey Waterson
          <br />
          <small>Ascent Business Solutions</small>
        </span>
      </div>
      <div>
        <Heading id="ascent-about-title">Meet Geoffrey.</Heading>
        <p className="bio">
          I started by building tools for myself, then began building them for
          other people. Over the past few years of working with AI, I’ve come to
          appreciate the small wins. If an estimator can turn a customer’s email
          into a draft quote, they can spend their time checking the price and
          talking to the customer.
        </p>
        <p className="bio-example">
          When you run a small or mid-sized business, your time and budget have
          to stretch. When we talk, I’ll ask what takes up more of your week
          than it should. From there, we can work out whether a custom tool, a
          better website, or some hands-on AI training would be worth the
          investment.
        </p>
        <Link href="/book" className="textlink">
          Talk through a project <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
