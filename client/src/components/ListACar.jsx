import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

const ListACar = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState({});
  const [formData, setFormData] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [selectedImages, setSelectedImages] = React.useState([]);

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  //   const handleSubmit = async (e) => {
  //       e.preventDefault();

  //       try{

  //         const res = await fetch(`${ import.meta.env.VITE_API_URL}/car/createCar`,{
  //             method:"POST",
  //             credentials:"include",
  //             headers:{
  //                 "Content-Type":"multiform/data",
  //             },
  //             body:   JSON.stringify(formData),
  //         });

  //         // const data = await res.json();
  //         console.log(res)
  //       }catch(err){
  //         console.log("unable to List car, ", err);
  //       }

  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    console.log("Appending data into form");
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    console.log("Appending images into form");
    for (let file of selectedImages) {
      form.append("images", file);
    }

    try {
      console.log("Sent Request");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/car/createCar`, {
        method: "POST",
        credentials: "include",
        body: form, // No need to set Content-Type; browser will set it with boundary
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log("Unable to list car:", err);
    }
  };

  return (
    <Form>
      <Label htmlFor="make">Make</Label>
      <Input
        required
        type="text"
        id="make"
        name="make"
        value={formData.make || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="model">Model</Label>
      <Input
        required
        type="text"
        id="model"
        name="model"
        value={formData.model || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="year">Year</Label>
      <Input
        required
        type="number"
        id="year"
        name="year"
        value={formData.year || ""}
        onChange={handleChange}
      ></Input>
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover> */}
      <Label htmlFor="price">Price</Label>
      <Input
        required
        type="text"
        id="price"
        name="price"
        value={formData.price || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="fuel">Fuel Type</Label>
      <Input
        required
        type="text"
        id="fuel"
        name="fuelType"
        value={formData.fuelType || ""}
        onChange={handleChange}
      ></Input>

      <Label htmlFor="transmission">Transmission</Label>
      <Input
        required
        type="text"
        id="transmission"
        name="transmission"
        value={formData.transmission || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="location">Location</Label>
      <Input
        required
        type="text"
        id="location"
        name="location"
        value={formData.location || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="mileage">Mileage</Label>
      <Input
        required
        type="text"
        id="mileage"
        name="mileage"
        value={formData.mileage || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="desc">Description</Label>
      <Input
        required
        type="text"
        id="desc"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
      ></Input>

      <Label htmlFor="color">Color</Label>
      <Input
        required
        type="text"
        id="color"
        name="color"
        value={formData.color || ""}
        onChange={handleChange}
      ></Input>
      <Label htmlFor="images">Upload Images</Label>
      <Input
        required
        type="file"
        id="images"
        name="images"
        multiple
        onChange={handleImageChange}
      />
      {selectedImages &&
        selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="w-32 h-32 object-cover rounded mb-2"
          />
        ))}

      <Button type="submit" onClick={handleSubmit}>
        Upload
      </Button>
    </Form>
  );
};

export default ListACar;
