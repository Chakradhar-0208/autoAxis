import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const UpdateCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)
  const [images, setImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const API_URL = import.meta.env.VITE_API_URL

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    variant: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    location: "",
    mileage: "",
    color: "",
    tag:""
  })

  useEffect(() => {
    document.title = "Update Car | AutoAxis"
    fetch(`${API_URL}/car/getCarbyId/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data)
        setFormData({
          make: data.make || "",
          model: data.model || "",
          variant: data.variant || "",
          year: data.year?.toString() || "",
          price: data.price?.toString() || "",
          fuelType: data.fuelType || "",
          transmission: data.transmission || "",
          location: data.location || "",
          mileage: data.mileage?.toString() || "",
          color: data.color || "",
          tag: data.tag || "",
        })
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value)
    })

    images.forEach((img) => {
      form.append("images", img)
    })

    try {
      const res = await fetch(`${API_URL}/car/updateCar/${id}`, {
        credentials: "include",
        method: "PUT",
        body: form,
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Car updated successfully", {
          description: "Redirecting to your car page...",
        })
        setTimeout(() => navigate(`/getCarbyId/${id}`), 1500)
      } else {
        throw new Error(data?.message || "Something went wrong!")
      }
    } catch (err) {
      toast.error("Update failed", {
        description: err.message || "Failed to update car.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!car) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-background shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          ["make", "Make"],
          ["model", "Model"],
          ["variant", "Variant"],
          ["year", "Year"],
          ["price", "Price"],
          ["tag", "Tag"],
          ["location", "Location"],
          ["mileage", "Mileage"],
          ["color", "Color"],
        ].map(([key, label]) => (
          <div key={key} className="space-y-1">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              required
            />
          </div>
        ))}

        <div className="space-y-1">
          <Label>Fuel Type</Label>
          <Select
            value={formData.fuelType}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, fuelType: val }))}
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

        <div className="space-y-1">
          <Label>Transmission</Label>
          <Select
            value={formData.transmission}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, transmission: val }))}
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

        <div className="space-y-1">
          <Label htmlFor="images">Upload New Images</Label>
          <Input type="file" id="images" multiple onChange={handleImageChange} />
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 border p-2 rounded-md">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Car"}
        </Button>
      </form>
    </div>
  )
}

export default UpdateCar
