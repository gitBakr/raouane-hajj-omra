// import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";

// interface PackageDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   packageData: {
//     id: string;
//     title: string;
//     price: number;
//     description: string;
//     imageUrl: string;
//     duration: string;
//     included: string[];
//     notIncluded: string[];
//   };
// }

// export function PackageDetailsModal({ isOpen, onClose, packageData }: PackageDetailsModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white p-0">
//         <DialogHeader className="flex flex-row justify-end p-4 bg-primary/10">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onClose}
//             className="relative hover:bg-primary/20"
//           >
//             <X className="h-6 w-6" />
//           </Button>
//         </DialogHeader>

//         <div className="px-6 py-4">
//           <div className="relative">
//             <div className="absolute top-4 right-4 bg-primary text-white px-6 py-3 rounded-full z-10 text-lg font-bold shadow-lg">
//               {packageData.price} €
//             </div>
//             <img 
//               src={packageData.imageUrl} 
//               alt={packageData.title}
//               className="w-full h-[350px] object-cover rounded-xl shadow-md"
//             />
//           </div>

//           <div className="space-y-8 py-6">
//             <div>
//               <h1 className="text-4xl font-bold text-primary mb-4">{packageData.title}</h1>
//               <div className="flex items-center gap-2 text-gray-700 bg-gray-100 p-3 rounded-lg inline-block">
//                 <span className="inline-block text-xl">🕒</span>
//                 <span className="font-medium">Durée: {packageData.duration}</span>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-6 rounded-xl">
//               <h2 className="text-2xl font-semibold mb-4 text-primary">Description</h2>
//               <p className="text-gray-700 leading-relaxed text-lg">{packageData.description}</p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="bg-green-50 p-6 rounded-xl">
//                 <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
//                   <span className="text-green-500">✓</span>
//                   Inclus
//                 </h2>
//                 <ul className="space-y-3">
//                   {packageData.included.map((item, index) => (
//                     <li key={index} className="flex items-center gap-3 text-gray-700">
//                       <span className="text-green-500 text-xl">•</span>
//                       <span className="text-lg">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               <div className="bg-red-50 p-6 rounded-xl">
//                 <h2 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-2">
//                   <span className="text-red-500">✗</span>
//                   Non inclus
//                 </h2>
//                 <ul className="space-y-3">
//                   {packageData.notIncluded.map((item, index) => (
//                     <li key={index} className="flex items-center gap-3 text-gray-700">
//                       <span className="text-red-500 text-xl">•</span>
//                       <span className="text-lg">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <Button 
//               className="w-full py-8 text-xl font-bold shadow-xl hover:scale-[1.02] transition-transform" 
//               size="lg"
//             >
//               Réserver maintenant
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// } 