// import { useState, useEffect } from 'react';

// interface CampaignProfileProps {
//   userId: string; // We pass the logged-in userId as a prop
// }

// const CampaignProfile = ({ userId }: CampaignProfileProps) => {
//   const [campaign, setCampaign] = useState<any>(null); // Replace `any` with your data type
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCampaignData = async () => {
//       try {
//         const response = await fetch(`/api/campaign/${userId}`); // Call the backend route with userId
//         const data = await response.json();

//         if (response.ok) {
//           setCampaign(data);
//         } else {
//           setError(data.message || 'Failed to load campaign data');
//         }
//       } catch (err) {
//         setError('Error fetching campaign data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchCampaignData();
//     }
//   }, [userId]);

//   if (loading) return <p>Loading campaign...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="campaign-profile">
//       {campaign ? (
//         <div>
//           <h2>{campaign.name}</h2>
//           <p>{campaign.sport}</p>
//           <img src={campaign.profileImage} alt="Profile" />
//           <p>{campaign.whySponsorMe}</p>
//           <div>
//             <h3>Awards & Accolades</h3>
//             <ul>
//               {campaign.awardsAccolades?.map((award: string, index: number) => (
//                 <li key={index}>{award}</li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3>Gallery</h3>
//             <div>
//               {campaign.gallery?.map((image: string, index: number) => (
//                 <img key={index} src={image} alt={`Gallery ${index}`} />
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No campaign data available.</p>
//       )}
//     </div>
//   );
// };

// export default CampaignProfile;
