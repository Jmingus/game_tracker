class Want < ActiveRecord::Base
  belongs_to :user
  has_attached_file :board_image, :styles => { :large => "300x300>",:medium => "200x200>", :thumb => "100x100>" },
                    :default_url => "/images/:style/missing.png",
                    :url =>':s3_domain_url',
                    :path => '/:class/:attachment/:id_partition/:style/:filename'

  validates_attachment_content_type :board_image, :content_type => /\Aimage\/.*\Z/
  validates_uniqueness_of :board_name
  validates_presence_of :board_image, :min_player, :max_player, :playtime, :board_name, :published
end
