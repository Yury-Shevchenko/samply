export const metadata = { title: "Help — Samply" };

export default function HelpPage() {
  return (
    <div className="inner">
      <p />
      <div className="card">
        <div className="card-message">
          <h5>
            <div className="headerLink">Do you have a question?</div>
          </h5>
          <form action="/faq" method="POST">
            <textarea name="question" placeholder="Ask it here" required />
            <input type="submit" value="Send" className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}
