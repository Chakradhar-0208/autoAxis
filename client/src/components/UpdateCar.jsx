import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    location: "",
    mileage: "",
    color: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/car/getCarbyId/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setFormData({
          make: data.make || "",
          model: data.model || "",
          year: data.year || "",
          price: data.price || "",
          fuelType: data.fuelType || "",
          transmission: data.transmission || "",
          location: data.location || "",
          mileage: data.mileage || "",
          color: data.color || "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    images.forEach((img) => {
      form.append("images", img);
    });

    const res = await fetch(`${API_URL}/car/updateCar/${id}`, {
      credentials: "include",
      method: "PUT",
      body: form,
    });

    if (res.ok) {
      alert("Car updated successfully!");
      navigate(`/getCarbyId/${id}`);
    } else {
      alert("Failed to update car.");
    }
  };

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          ["make", "Make"],
          ["model", "Model"],
          ["year", "Year"],
          ["price", "Price"],
          ["transmission", "Transmission"],
          ["location", "Location"],
          ["mileage", "Mileage"],
          ["color", "Color"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={label}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
