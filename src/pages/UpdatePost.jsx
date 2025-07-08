import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Load post from localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const foundPost = storedPosts.find((p) => p._id === postId);
    if (foundPost) {
      setFormData(foundPost);
      setPublishError(null);
    } else {
      setPublishError('Post not found');
    }
  }, [postId]);

  // Upload image to Firebase
  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
            setImagePreview(null);
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.error(error);
    }
  };

  // Save updated post to localStorage
  const handlePublish = () => {
    try {
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = existingPosts.map((post) =>
        post._id === postId ? { ...formData } : post
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      alert('Post updated successfully!');
      navigate('/dashboard?tab=posts');
    } catch (error) {
      console.error(error);
      setPublishError('Something went wrong while saving');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4">
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title || ''}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ''}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* Image Upload Section */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              if (selectedFile) {
                setImagePreview(URL.createObjectURL(selectedFile));
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {/* Upload Error */}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}

        {/* Image Preview */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-72 object-cover rounded-lg cursor-pointer transition-opacity duration-300 hover:opacity-70"
            title="Click to remove image"
            onClick={() => {
              setImagePreview(null);
              setFile(null);
            }}
          />
        )}

        {/* Existing Image */}
        {formData.image && !imagePreview && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-cover rounded-lg"
          />
        )}

        {/* Rich Text Editor */}
        <ReactQuill
          theme="snow"
          value={formData.content || ''}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Publish Button */}
        <Button
          type="button"
          gradientDuoTone="purpleToPink"
          onClick={handlePublish}
        >
          Update Post
        </Button>

        {/* Publish Error */}
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
