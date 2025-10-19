import { useState } from 'react';
import { Heart, Lock } from 'lucide-react';

function App() {
  const [step, setStep] = useState<'start' | 'question' | 'letter'>('start');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleHeartClick = () => {
    setStep('question');

    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setHearts(newHearts);

    setTimeout(() => {
      setHearts([]);
    }, 3000);
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = '18/10/2025';

    if (answer === correctAnswer) {
      setError('');
      setStep('letter');

      const celebrationHearts = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8
      }));
      setHearts(celebrationHearts);

      setTimeout(() => {
        setHearts([]);
      }, 3000);
    } else {
      setError('Không đúng rồi em ơi! Thử lại nhé 💕');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 relative overflow-hidden">
      {/* Floating petals background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          >
            <div className="w-3 h-3 bg-pink-300 rounded-full opacity-40" />
          </div>
        ))}
      </div>

      {/* Explosion hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute top-1/2 left-1/2 pointer-events-none animate-heart-burst"
          style={{
            '--x': `${heart.x - 50}vw`,
            animationDelay: `${heart.delay}s`
          } as React.CSSProperties}
        >
          <Heart className="text-red-400 fill-red-400" size={20} />
        </div>
      ))}

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {step === 'start' && (
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 mb-8 animate-pulse-slow">
              20 • 10
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-pink-800 mb-12">
              Ngày Phụ Nữ Việt Nam
            </h2>

            <button
              onClick={handleHeartClick}
              className="group relative transform transition-all duration-500 hover:scale-110 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 animate-pulse-glow" />
              <div className="relative bg-gradient-to-br from-pink-500 via-red-500 to-pink-600 p-12 rounded-full shadow-2xl">
                <Heart
                  className="text-white fill-white animate-heartbeat"
                  size={80}
                />
              </div>
            </button>

            <p className="mt-8 text-pink-700 text-lg font-medium animate-bounce-slow">
              Nhấn vào trái tim ❤️
            </p>
          </div>
        )}

        {step === 'question' && (
          <div className="max-w-lg mx-auto animate-slide-up">
            <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200 ${shake ? 'animate-shake' : ''}`}>
              <div className="text-center mb-8">
                <Lock className="inline-block text-pink-500 animate-pulse" size={60} />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 text-center mb-6">
                Câu Hỏi Dành Cho Em
              </h2>

              <p className="text-gray-700 text-lg text-center mb-8">
                Họ và tên của em? 💕
              </p>

              <form onSubmit={handleSubmitAnswer} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-6 py-4 text-lg text-center border-2 border-pink-300 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-center font-medium animate-fade-in">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all shadow-lg"
                >
                  Xác Nhận
                </button>
              </form>

              <div className="mt-8 flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className="text-pink-400 fill-pink-400 animate-heartbeat"
                    size={24}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'letter' && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200">
              <div className="text-center mb-8">
                <Heart className="inline-block text-red-500 fill-red-500 animate-heartbeat" size={60} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 text-center mb-8">
                Dear my luv ❤️
              </h2>

              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="src/img/566485127_1387792136277058_1537409380867149166_n.jpg"
                  alt="Romantic couple"
                  className="w-full h-100 object-cover"
                />
              </div>

              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Nhân ngày 20/10, anh muốn gửi đến em những lời chúc tốt đẹp nhất.
                </p>
                <p className="animate-fade-in-up font-semibold text-pink-700 text-xl text-center" style={{ animationDelay: '1s' }}>
                  Anh yêu em nhiều lắm! ❤️
                </p>
              </div>

              <div className="mt-10 flex justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="text-red-500 fill-red-500 animate-heartbeat"
                    size={30}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-pink-600 font-medium text-xl animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                  20/10/2025
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
