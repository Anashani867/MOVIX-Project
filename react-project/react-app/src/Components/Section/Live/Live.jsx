import React from "react";
import "./Live.css"; // Ensure this CSS file contains your styles

const Live = () => {
  return (
    <div>
      {/* Live Section */}
      <section className="live">
        <div className="live-border">
          <h4>Movix + Live TV</h4>
          <div className="text-xl">Live TV Makes It Better</div>
          <div className="sub-text">
            Make the switch from cable. Get 75+ top channels with your favorite
            live sports, news, and events - plus the entire Movix streaming
            library.
          </div>
          <div className="legal-text">
            Live TV plan required. Regional restrictions, blackouts, and additional
            terms apply. See details
          </div>
        </div>
      </section>

      {/* Live Sports Section */}
      <section className="live-sports">
        <div className="live-sports-content">
          <div className="text-xl">Live Sports</div>
          <div className="sub-text">
            Catch your games at home or on the go. Stream live games from major
            college and pro leagues including the NCAA®, NBA, NHL, NFL, and more.
          </div>

          <div className="live-sports-logos">
            <div>
              <img
                src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/live-sports-logo-1.png?raw=true"
                alt="Live Sports Logo 1"
              />
            </div>
            <div>
              <img
                src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/live-sports-logo-2.png?raw=true"
                alt="Live Sports Logo 2"
              />
            </div>
            <div>
              <img
                src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/live-sports-logo-3.svg?raw=true"
                alt="Live Sports Logo 3"
              />
            </div>
            <div>
              <img
                src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/live-sports-logo-4.png?raw=true"
                alt="Live Sports Logo 4"
              />
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
  <iframe
    src="https://vidsrc.xyz/embed/movie/tt0111161"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: '8px', // Adds rounded corners
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Adds a subtle shadow
    }}
    allowFullScreen
    title="Embedded Movie"
  ></iframe>
</div>
          <div className="legal-text">
            Live TV plan required. Regional restrictions, blackouts, and additional
            terms apply. See details
          </div>
        </div>
      </section>
    </div>
  );
};

export default Live;
