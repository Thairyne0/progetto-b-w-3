import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Recommendation {
  imgSrc: string;
  title: string;
  description: string;
  isRounded?: boolean;
}

const recommendations: Recommendation[] = [
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8u8BZcgcIxcfgSJsas_HDf2pfYTBlmo2q3g&s",
    title: "Microsoft",
    description: "Company • Sviluppo di software",
  },
  {
    imgSrc: "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
    title: "Bill Gates",
    description: "Chair, Gates Foundation and Founder, Breakthrough Energy",
    
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEvlDOl9O3KXAyeDRcU7SahzY95yFhVfrAZODT1kfBc9zC9o4BVsE-duIIS21Xm8U38RI&usqp=CAU",
    title: "Apple Inc.",
    description: "Company • abbricazione di computer e apparecchiature elettroniche",
  },
];

const FeedRecommendations: React.FC = () => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      <div className="card-body">
        <h6 className="card-title">Add to your feed</h6>
        {recommendations.map((rec, index) => (
          <div key={index} className="mb-3 d-flex align-items-center">
            <img
              src={rec.imgSrc}
              alt={rec.title}
              className="me-3 rounded-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-0">{rec.title}</h6>
              <p className="text-muted mb-0" style={{ fontSize: "0.875rem" }}>
                {rec.description}
              </p>
              <button
                className="btn btn-outline-dark btn-sm rounded-pill"
                style={{ width: "auto", minWidth: "80px" }}
              >
                + Follow
              </button>
            </div>
            <div>
             
            </div>
          </div>
        ))}

        <a href="#" className="text-black" style={{ fontSize: "0.875rem" }}>
          View all recommendations &rarr;
        </a>
      </div>
    </div>
  );
};

export default FeedRecommendations;
