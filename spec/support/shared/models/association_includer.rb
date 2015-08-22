shared_examples "association includer" do |assoc_macro, relation, through|
  before do
    @assoc = described_class.reflect_on_association(relation)
  end

  if through.present?
    it "#{assoc_macro.to_s} #{relation.to_s} through #{through}" do
      expect(@assoc.macro).to eq(assoc_macro)
      expect(@assoc.options[:through]).to eq(through)
    end
  else
    it "#{assoc_macro.to_s} #{relation.to_s}" do
      expect(@assoc.macro).to eq(assoc_macro)
    end
  end
end
