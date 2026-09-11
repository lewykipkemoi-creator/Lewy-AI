import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  Globe2,
  Inbox,
  Instagram,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

const features = [
  [Inbox, "One customer inbox", "Bring customer conversations into one workspace."],
  [Bot, "AI responses", "Let Lewy handle routine customer questions and conversations."],
  [TrendingUp, "Lead recovery", "Find opportunities that could be lost through slow or missed follow-up."],
  [CalendarDays, "Appointment booking", "Turn qualified conversations into scheduled appointments."],
  [Users, "Customer profiles", "Keep customer information and conversation history connected."],
  [ShieldCheck, "Human control", "Keep sensitive decisions and actions under business control."]
];

const channels = [
  [MessageCircle, "WhatsApp"],
  [Mail, "Gmail"],
  [Instagram, "Instagram"],
  [Globe2, "Website"],
  [Send, "Telegram"],
  [Users, "Facebook"]
];

export default function Home() {
  return (
    <main>
      <style jsx global>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:#07090d;color:#f5f7fa;font-family:Inter,system-ui,sans-serif}
        a{text-decoration:none;color:inherit}
        .wrap{width:min(1120px,calc(100% - 32px));margin:auto}
        nav{height:74px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #181b22}
        .logo{font-size:21px;font-weight:800;display:flex;gap:8px;align-items:center}
        .logo span{color:#8b5cf6}
        .mark{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,#8b5cf6,#6366f1)}
        .navlinks{display:flex;gap:27px;color:#9197a3;font-size:14px}
        .navlinks a:hover{color:#fff}
        .actions{display:flex;gap:9px;align-items:center}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 16px;border-radius:9px;font-size:14px;font-weight:700}
        .primary{background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff}
        .ghost{color:#b9bec8}
        .hero{text-align:center;padding:105px 0 90px;position:relative}
        .hero:before{content:"";position:absolute;width:520px;height:520px;background:#6366f1;opacity:.09;filter:blur(110px);border-radius:50%;top:0;left:50%;transform:translateX(-50%);pointer-events:none}
        .badge{position:relative;display:inline-flex;gap:7px;align-items:center;border:1px solid #29233e;background:#111020;color:#c4b5fd;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:700}
        h1{position:relative;font-size:clamp(45px,7vw,76px);line-height:1;letter-spacing:-4px;max-width:900px;margin:25px auto}
        .gradient{background:linear-gradient(100deg,#c4b5fd,#818cf8,#67e8f9);color:transparent;background-clip:text}
        .hero p{position:relative;color:#9299a6;max-width:680px;margin:auto;font-size:18px;line-height:1.7}
        .hero-actions{position:relative;margin-top:32px;display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
        .hero-note{position:relative;color:#666d79;font-size:12px;margin-top:15px}
        section{padding:90px 0}
        .eyebrow{color:#a78bfa;text-transform:uppercase;letter-spacing:1.7px;font-size:11px;font-weight:800}
        h2{font-size:clamp(32px,5vw,48px);letter-spacing:-2px;line-height:1.05;margin:10px 0}
        .intro{max-width:680px;color:#858c99;line-height:1.7}
        .features{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:38px}
        .feature{border:1px solid #1a1d25;background:#0c0f14;border-radius:14px;padding:25px}
        .icon{width:42px;height:42px;display:grid;place-items:center;background:#161326;color:#a78bfa;border-radius:10px;margin-bottom:18px}
        .feature h3{margin:0 0 8px;font-size:17px}
        .feature p{margin:0;color:#7e8592;line-height:1.65;font-size:14px}
        .channels{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
        .channel{display:flex;align-items:center;gap:9px;padding:12px 15px;border:1px solid #1c1f27;background:#0c0f14;border-radius:9px;color:#bbc0ca;font-size:13px}
        .workflow{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:38px}
        .step{padding:27px;border:1px solid #1a1d25;border-radius:14px;background:linear-gradient(145deg,#11101b,#0b0e13)}
        .number{color:#c4b5fd;font-size:12px;font-weight:800;margin-bottom:25px}
        .step h3{margin:0 0 9px}
        .step p{color:#7e8592;line-height:1.65;font-size:14px;margin:0}
        .pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:38px}
        .plan{padding:27px;border:1px solid #1b1e26;border-radius:15px;background:#0c0f14}
        .plan.popular{border-color:#57418e}
        .plan h3{margin:0}
        .price{font-size:28px;font-weight:850;margin-top:14px}
        .price small{font-size:11px;color:#6f7682}
        .desc{min-height:60px;color:#7e8592;font-size:13px;line-height:1.6}
        ul{padding:0;list-style:none}
        li{display:flex;gap:8px;color:#adb3bd;font-size:13px;margin:11px 0}
        li svg{color:#8b5cf6;flex-shrink:0}
        .cta{text-align:center;border:1px solid #28203e;background:radial-gradient(circle at 50% 0,#17112d,transparent 60%);padding:80px 25px;border-radius:20px}
        .cta h2{max-width:700px;margin:10px auto}
        .cta p{max-width:600px;color:#858c99;line-height:1.7;margin:18px auto 28px}
        footer{border-top:1px solid #181b22;padding:28px 0;margin-top:80px;color:#656c78;font-size:12px}
        .footer{display:flex;justify-content:space-between}
        @media(max-width:800px){.navlinks{display:none}.features,.workflow,.pricing{grid-template-columns:1fr}.hero{padding-top:75px}h1{letter-spacing:-2.5px}.footer{flex-direction:column;gap:12px}}
      `}</style>

      <div className="wrap">
        <nav>
          <Link href="/" className="logo">
            <span className="mark"><Sparkles size={16}/></span>
            lewy<span>AI</span>
          </Link>

          <div className="navlinks">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#channels">Channels</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="actions">
            <Link href="/login" className="btn ghost">Log in</Link>
            <Link href="/signup" className="btn primary">Get started <ArrowRight size={15}/></Link>
          </div>
        </nav>

        <section className="hero">
          <div className="badge"><Zap size={13}/> AI customer response & lead recovery</div>

          <h1>
            Never lose a customer because you{" "}
            <span className="gradient">replied too late.</span>
          </h1>

          <p>
            Lewy AI helps businesses respond to customers, identify valuable
            leads, follow up consistently and turn conversations into revenue.
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn primary">
              Create your workspace <ArrowRight size={16}/>
            </Link>
            <a href="#how" className="btn ghost">See how it works</a>
          </div>

          <div className="hero-note">
            Your workspace starts empty. Real business activity creates the data.
          </div>
        </section>

        <section id="features">
          <div className="eyebrow">The core engine</div>
          <h2>More than a chatbot.</h2>
          <p className="intro">
            Lewy is designed around the complete customer journey: message,
            response, qualification, follow-up and conversion.
          </p>

          <div className="features">
            {features.map(([Icon,title,text]) => {
              const Component = Icon as typeof Inbox;
              return (
                <div className="feature" key={String(title)}>
                  <div className="icon"><Component size={20}/></div>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="channels">
          <div className="eyebrow">Communication</div>
          <h2>Where your customers already talk.</h2>
          <p className="intro">
            Lewy is built around a unified customer communication layer so
            businesses can manage conversations without constantly switching
            between platforms.
          </p>

          <div className="channels">
            {channels.map(([Icon,name]) => {
              const Component = Icon as typeof Inbox;
              return (
                <div className="channel" key={String(name)}>
                  <Component size={17}/>
                  {String(name)}
                </div>
              );
            })}
          </div>
        </section>

        <section id="how">
          <div className="eyebrow">How Lewy works</div>
          <h2>From message to opportunity.</h2>
          <p className="intro">
            Every conversation can become an opportunity when the right action
            happens at the right time.
          </p>

          <div className="workflow">
            <div className="step">
              <div className="number">01</div>
              <h3>Customer messages</h3>
              <p>A customer starts a conversation through a connected channel.</p>
            </div>

            <div className="step">
              <div className="number">02</div>
              <h3>Lewy understands</h3>
              <p>AI analyzes intent, answers appropriate questions and identifies buying signals.</p>
            </div>

            <div className="step">
              <div className="number">03</div>
              <h3>The opportunity moves</h3>
              <p>Lewy helps qualify, follow up, schedule or hand the conversation to a human.</p>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="eyebrow">Pricing</div>
          <h2>Built for different stages of growth.</h2>
          <p className="intro">
            Launch pricing. Usage limits and individual plan features may
            evolve as the platform grows.
          </p>

          <div className="pricing">
            {[
              ["Starter","KES 2,500","For small businesses beginning with AI customer response.",["Unified inbox","AI responses","Lead capture","Follow-up management"]],
              ["Growth","KES 7,500","For growing businesses handling more conversations.",["Everything in Starter","Lead qualification","Automated follow-ups","Calendar booking","Revenue tracking"]],
              ["Pro","KES 20,000+","For businesses requiring deeper automation.",["Everything in Growth","Advanced workflows","Multiple team members","Priority support","Custom automation"]]
            ].map(([name,price,desc,items],index) => (
              <div className={`plan ${index===1 ? "popular" : ""}`} key={String(name)}>
                <h3>{String(name)}</h3>
                <div className="price">{String(price)} <small>/ month</small></div>
                <p className="desc">{String(desc)}</p>
                <ul>
                  {(items as string[]).map(item => (
                    <li key={item}><Check size={15}/>{item}</li>
                  ))}
                </ul>
                <Link href="/signup" className="btn primary" style={{width:"100%",marginTop:18}}>
                  Get started <ArrowRight size={15}/>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="cta">
            <div className="eyebrow">Lewy AI</div>
            <h2>Turn missed conversations into recovered opportunities.</h2>
            <p>
              Build a customer-response system that works alongside your
              business instead of letting valuable conversations disappear.
            </p>
            <Link href="/signup" className="btn primary">
              Create your workspace <ArrowRight size={16}/>
            </Link>
          </div>
        </section>

        <footer>
          <div className="footer">
            <span>© 2026 Lewy AI</span>
            <span>Customer response. Lead recovery. Revenue.</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
