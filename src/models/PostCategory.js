module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: {
        type:DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
    }, 
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });
  
    PostCategory.associate = ({ Category, BlogPost }) => {
      Category.belongsToMany(BlogPost, {
      as: 'posts',
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
      });

      BlogPost.belongsToMany(Category, {
        as: 'categories',
        foreignKey: 'category_id',
        otherKey: 'post_id',
        through: PostCategory,
      })
    }
  
    return PostCategory;
  };