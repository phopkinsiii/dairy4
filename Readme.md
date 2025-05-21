<BlogEditor
  content={formData.content}
  setContent={(content) => {
    setFormData({ ...formData, content });
    setIsChanged(content !== initialData?.content);
  }}
/>
