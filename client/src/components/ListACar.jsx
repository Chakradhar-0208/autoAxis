import React from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Form } from "./ui/form"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const ListACar = () => {
  const [formData, setFormData] = React.useState({})
  const [selectedImages, setSelectedImages] = React.useState([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Post Your Car | AutoAxis"
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData()

    if (formData.year) {
      form.append("year", formData.year)
    }

    for (let key in formData) {
      if (key !== "year") {
        form.append(key, formData[key])
      }
    }

    for (let file of selectedImages) {
      form.append("images", file)
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/car/createCar`, {
        method: "POST",
        credentials: "include",
        body: form,
      })

      const data = await res.json()

      if (res.ok) {
        toast("Car uploaded successfully", {
          description: "Redirecting to your cars list...",
        })
        setTimeout(() => navigate("/userCars"), 1500)
      } else {
        throw new Error(data?.message || "Something went wrong!")
      }
    } catch (err) {
      toast("Upload failed", {
        description: err.message || "Failed to upload car.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderYearOptions = () => {
    const years = []
    const currentYear = new Date().getFullYear()
    for (let y =currentYear ; y >=1980 ; y--) {
      years.push(
        <SelectItem key={y} value={y.toString()}>
          {y}
        </SelectItem>
      )
    }
    return years
  }

  return (
    <div className="max-w-full  dark:bg-[#050505]">
    <div className="max-w-lg  md:max-w-2xl mx-auto flex flex-col justify-center items-center space-y-3 py-20">
      <Form>
        <h1 className="font-bold -mt-10 mb-3 text-3xl">POST YOUR CAR</h1>

        <div className="w-[80%]">
          <Label htmlFor="make">Make</Label>
          <Input
            placeholder="e.g., Volkswagen"
            required
            type="text"
            id="make"
            name="make"
            value={formData.make || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="model">Model</Label>
          <Input
            placeholder="e.g., Virtus"
            required
            type="text"
            id="model"
            name="model"
            value={formData.model || ""}
            onChange={handleChange}
          />
        </div>
<div className="w-[80%]">
  <Label htmlFor="variant">Variant</Label>
  <Input
    placeholder="e.g., Highline 1.0 TSI"
    required
    type="text"
    id="variant"
    name="variant"
    value={formData.variant || ""}
    onChange={handleChange}
  />
</div>

        <div className="w-[80%]">
          <Label htmlFor="price">Price</Label>
          <Input
            placeholder="e.g., 15,60,000"
            required
            type="text"
            id="price"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-[80%]">
          <Label htmlFor="tag">Tag</Label>
          <Input
            placeholder="NEW"
            required
            type="text"
            id="tag"
            name="tag"
            value={formData.tag || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label>Fuel Type</Label>
          <Select
            value={formData.fuelType || ""}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, fuelType: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="CNG">CNG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[80%]">
          <Label>Transmission</Label>
          <Select
            value={formData.transmission || ""}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, transmission: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[80%]">
          <Label>Year</Label>
          <Select
            value={formData.year || ""}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, year: val }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>{renderYearOptions()}</SelectContent>
          </Select>
        </div>

        <div className="w-[80%]">
          <Label htmlFor="location">Location</Label>
          <Input
            placeholder="e.g., Hyderabad"
            required
            type="text"
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            placeholder="e.g., 16 km/l"
            required
            type="text"
            id="mileage"
            name="mileage"
            value={formData.mileage || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="kmsDriven">KMs Driven</Label>
          <Input
            placeholder="e.g., 30,000 km"
            required
            type="text"
            id="kmsDriven"
            name="kmsDriven"
            value={formData.kmsDriven || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="description">Description</Label>
          <Input
            placeholder="e.g., Well-maintained, single owner..."
            required
            type="text"
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="color">Color</Label>
          <Input
            placeholder="e.g., Deep Black"
            required
            type="text"
            id="color"
            name="color"
            value={formData.color || ""}
            onChange={handleChange}
          />
        </div>

        <div className="w-[80%]">
          <Label htmlFor="images">Upload Images</Label>
          <Input
            required
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <div className="border flex w-[80%] rounded-lg overflow-auto space-x-2 mt-2">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
              className="w-36 h-36 object-cover rounded"
            />
          ))}
        </div>

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-4"
        >
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>
      </Form>
    </div>
    </div>
  )
}

export default ListACar
