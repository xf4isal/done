import { useEffect, useRef, useState } from "react";

type Stage =
  | "hi"
  | "happy-btn"
  | "happy-words"
  | "sad-btn"
  | "sad-words"
  | "maaf"
  | "505";

const HAPPY_WORDS = [
  "aku cinta kamu",
  "kita selamanya",
  "kita sampai mati",
  "kita nikah sampe anak 20",
  "kamu tuh rumahku",
  "nggak ada yang lain",
  "aku milih kamu tiap hari",
  "bahkan di hari yang paling berat",
  "kamu alasanku pulang",
  "kamu alasanku mau bangun pagi",
  "nggak bisa bayangin tanpa kamu",
  "kamu udah kayak napas buat aku",
  "tiap detik sama kamu itu berharga",
  "aku mau tua sama kamu",
  "sampe rambut kita putih semua",
  "kamu yang terbaik buat aku",
  "cukup kamu aja",
  "hanya kamu",
  "forever",
  "always",
  "i choose you",
  "kamu lebih dari cukup",
  "kamu duniaku",
  "aku sayang kamu banget",
  "jangan pergi",
  "tetep di sini ya",
  "di sampingku",
  "bareng terus",
  "selamanya bareng",
  "kamu sama aku",
  "nggak ada habisnya",
  "kamu segalanya",
  "aku mau nikah sama kamu",
  "berdua aja udah cukup",
  "aku kangen kamu mulu",
  "nggak pernah bosen",
  "kamu yang aku tungguin",
  "sampai akhir",
  "aku janji",
  "sama kamu aja",
  "nggak ada yang lebih baik",
  "kamu sempurna di mataku",
  "kamu bagian dari aku",
  "peluk aku terus",
  "jangan lepas",
  "aku pilih kamu",
  "kamu paling aku",
  "kamu tuh kamu",
  "nggak mau yang lain",
  "aku ada buat kamu",
];

const SAD_WORDS = [
  "kita putus",
  "sampe sini aja",
  "maaf",
  "udahan yuk",
  "udah?",
  "egois banget",
  "toxic",
  "balikan?",
  "gabisa",
  "nggak akan bisa",
  "nggak ada perubahan",
  "ingkar janji mulu",
  "selamat tinggal",
  "aku capek",
  "kamu juga capek kan",
  "kita sama-sama capek",
  "udah terlalu jauh",
  "nggak bisa diperbaiki lagi",
  "nggak ada jalan balik",
  "kita udah beda",
  "kamu berubah",
  "aku juga berubah",
  "mungkin emang harus gini",
  "aku nggak kenal kamu lagi",
  "kamu nggak kenal aku",
  "sia-sia",
  "udah cukup",
  "nggak ada lagi",
  "kosong",
  "hampa banget",
  "capek nunggu",
  "capek berharap",
  "sakit",
  "tapi harus",
  "nggak ada pilihan lain",
  "lupain aku",
  "lanjutin hidupmu",
  "jangan tunggu",
  "ini udah akhirnya",
  "kita selesai",
  "aku nyerah",
  "bukan salah siapapun",
  "atau emang salah kita",
  "semuanya udah terlanjur",
  "nggak bisa diulang",
  "kenangan aja yang tersisa",
  "simpen aja di sana",
  "aku pergi",
  "kamu pergi",
  "kita pergi sendiri-sendiri",
];

interface FloatWord {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
}

function generateWords(words: string[], count: number): FloatWord[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: words[Math.floor(Math.random() * words.length)],
    x: 4 + Math.random() * 87,
    y: 3 + Math.random() * 88,
    size: 10 + Math.random() * 9,
    dur: 2 + Math.random() * 1.8,
    delay: Math.random() * 3.8,
  }));
}

export default function App() {
  const [stage, setStage] = useState<Stage>("hi");
  const [hiOpacity, setHiOpacity] = useState(0);
  const [btnOpacity, setBtnOpacity] = useState(0);
  const [happyWords, setHappyWords] = useState<FloatWord[]>([]);
  const [sadWords, setSadWords] = useState<FloatWord[]>([]);
  const [maafOpacity, setMaafOpacity] = useState(0);
  const [endOpacity, setEndOpacity] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const t = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  };

  // Stage hi: fade in → fade out → show button
  useEffect(() => {
    if (stage === "hi") {
      t(() => setHiOpacity(1), 100);
      t(() => setHiOpacity(0), 2600);
      t(() => {
        setStage("happy-btn");
        t(() => setBtnOpacity(1), 100);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHappyClick = () => {
    if (stage !== "happy-btn") return;
    setBtnOpacity(0);
    t(() => {
      setStage("happy-words");
      setHappyWords(generateWords(HAPPY_WORDS, 55));
      t(() => {
        setHappyWords([]);
        setStage("sad-btn");
        t(() => setBtnOpacity(1), 100);
      }, 5200);
    }, 600);
  };

  const handleSadClick = () => {
    if (stage !== "sad-btn") return;
    setBtnOpacity(0);
    t(() => {
      setStage("sad-words");
      setSadWords(generateWords(SAD_WORDS, 55));
      t(() => {
        setSadWords([]);
        setStage("maaf");
        t(() => setMaafOpacity(1), 150);
        t(() => setMaafOpacity(0), 3800);
        t(() => {
          setStage("505");
          t(() => setEndOpacity(1), 150);
        }, 5400);
      }, 5200);
    }, 600);
  };

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ background: "#000", width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>

      {/* ── HI ── */}
      {stage === "hi" && (
        <div
          className="screen"
          style={{ opacity: hiOpacity, transition: "opacity 1.4s ease" }}
        >
          <span className="hi-text">hi.</span>
        </div>
      )}

      {/* ── HAPPY BUTTON ── */}
      {stage === "happy-btn" && (
        <div
          className="screen"
          style={{ opacity: btnOpacity, transition: "opacity 1.4s ease" }}
        >
          <div style={{ textAlign: "center" }}>
            <p className="hint-text">pilih salah satu</p>
            <button className="btn-main" onClick={handleHappyClick}>
              klik&nbsp;&nbsp;:)
            </button>
          </div>
        </div>
      )}

      {/* ── HAPPY WORDS ── */}
      {stage === "happy-words" && (
        <div className="word-container">
          {happyWords.map((w) => (
            <span
              key={w.id}
              className="float-word"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                fontSize: `${w.size}px`,
                color: "#fff",
                "--dur": `${w.dur}s`,
                "--delay": `${w.delay}s`,
              } as React.CSSProperties}
            >
              {w.text}
            </span>
          ))}
        </div>
      )}

      {/* ── SAD BUTTON ── */}
      {stage === "sad-btn" && (
        <div
          className="screen"
          style={{ opacity: btnOpacity, transition: "opacity 1.4s ease" }}
        >
          <div style={{ textAlign: "center" }}>
            <p className="hint-text" style={{ color: "#3a3a3a" }}>atau yang ini</p>
            <button className="btn-sad" onClick={handleSadClick}>
              klik&nbsp;&nbsp;:(
            </button>
          </div>
        </div>
      )}

      {/* ── SAD WORDS ── */}
      {stage === "sad-words" && (
        <div className="word-container">
          {sadWords.map((w) => (
            <span
              key={w.id}
              className="float-word"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                fontSize: `${w.size}px`,
                color: "#555",
                "--dur": `${w.dur}s`,
                "--delay": `${w.delay}s`,
              } as React.CSSProperties}
            >
              {w.text}
            </span>
          ))}
        </div>
      )}

      {/* ── MAAF ── */}
      {stage === "maaf" && (
        <div className="screen">
          <p
            className="maaf-text"
            style={{
              opacity: maafOpacity,
              transition: "opacity 2s ease",
            }}
          >
            maaf buat semuanya.
          </p>
        </div>
      )}

      {/* ── 505 ── */}
      {stage === "505" && (
        <div
          className="screen"
          style={{
            opacity: endOpacity,
            transition: "opacity 2.5s ease",
            flexDirection: "column",
          }}
        >
          <span className="error-code">505</span>
          <div className="thin-line" />
          <p className="error-label">forbidden</p>
          <p className="error-sub">losing some bad guy</p>
        </div>
      )}
    </div>
  );
}
