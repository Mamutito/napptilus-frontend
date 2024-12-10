import { Link, useParams } from "react-router-dom";
import PhoneDetail from "../components/PhoneDetail";
import { ArrowLeft } from "lucide-react";
import { useStore } from "../hooks/useStore";
import PhoneRelated from "../components/PhoneRelated";
import { useEffect, useState } from "react";
import { PhoneDetailEntity } from "../types/Phone";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getPhoneById } = useStore();
  const [phone, setPhone] = useState<PhoneDetailEntity | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      if (id) {
        const phone = await getPhoneById(id);
        setPhone(phone);
      }
    };
    fetchPhone();
  }, [id, getPhoneById]);

  if (!phone)
    return <div className="flex justify-center items-center">Loading...</div>;

  return (
    <main className="container mx-auto px-4 md:pt-20 pt-10">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          BACK
        </Link>
      </div>
      <PhoneDetail phone={phone} />
      <PhoneRelated phones={phone?.similarProducts} />
    </main>
  );
};

export default ProductDetailPage;
