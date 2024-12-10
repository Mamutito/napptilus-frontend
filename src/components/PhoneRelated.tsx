import { Link } from "react-router-dom";
import { Phone } from "../types/Phone";

interface PhonesProps {
  phones: Phone[];
}

const PhoneRelated: React.FC<PhonesProps> = ({ phones }) => (
  <div className="my-16">
    <h2 className="text-lg font-bold mb-8">SIMILAR ITEMS</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 border-r border-b">
      {phones.slice(0, 5).map((phone) => (
        <Link
          key={phone.id}
          to={`/phone/${phone.id}`}
          className="group border-l border-t p-4"
        >
          <div className="aspect-square relative mb-4">
            <img
              src={phone.imageUrl}
              alt={`${phone.brand} ${phone.name}`}
              className="object-contain w-full h-full"
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">{phone.brand}</div>
            <div className="font-medium group-hover:underline">
              {phone.name}
            </div>
            <div className="text-sm">{phone.basePrice} EUR</div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default PhoneRelated;
