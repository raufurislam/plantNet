import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const PlantDetails = () => {
  const { id } = useParams();
  let [isOpen, setIsOpen] = useState(false);

  const {
    data: plant = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["plant", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plants/${id}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const { category, description, image, name, price, quantity, seller } = plant;

  // console.log(plant);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Helmet>
        <title>Money Plant</title>
      </Helmet>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={image}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
            // center={true}
          />
          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {description}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller: {seller?.name}</div>

            <img
              className="rounded-full w-9 h-9 object-cover"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={seller?.image}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity: {quantity}
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">Price: {price}$</p>
            <div>
              <Button
                onClick={() => setIsOpen(true)}
                label={quantity > 0 ? "Purchase" : "Out of stock"}
                disabled={quantity <= 0}
              />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal
            plant={plant}
            closeModal={closeModal}
            isOpen={isOpen}
            refetch={refetch}
          />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
