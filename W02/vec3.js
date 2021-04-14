class Vec3
{
    constructor(x,y,z)
    {
        this.x=x;
        this.y=y;
        this.z=z;
    }

    add( v )
    {
        this.x += v.x
        this.z += v.z
        this.y += v.y

        return this

    }

    min()
    {
        return this.y;
    }

    max()
    {
        return this.x;
    }

    mid()
    {
        return this.z;
    }
}